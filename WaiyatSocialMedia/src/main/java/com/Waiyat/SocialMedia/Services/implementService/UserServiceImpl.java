package com.Waiyat.SocialMedia.Services.implementService;

import com.Waiyat.SocialMedia.DTO.UserDto;
import com.Waiyat.SocialMedia.Mapper.UserMapper;
import com.Waiyat.SocialMedia.Models.User;
import com.Waiyat.SocialMedia.Repositories.UserRepository;
import com.Waiyat.SocialMedia.Services.UserServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class UserServiceImpl implements UserServices, UserDetailsService {

    @Autowired
    private final UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDto registration(UserDto userDto) {
        User user = UserMapper.mapUser(userDto);
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        User savedUser = userRepository.save(user);
        return UserMapper.mapUserDto(savedUser);
    }

    @Override
    public List<UserDto> getAllUsers() {
        List<User> users = userRepository.findAll();
        return users.stream().map(user -> UserMapper.mapUserDto(user)).collect(Collectors.toList());
    }

    @Override
    public UserDto getUserByUsername(String username) {
        User user = userRepository.findByUsername(username);
        if (user == null) {
            throw new UsernameNotFoundException("Invalid username");
        }
        return UserMapper.mapUserDto(user);
    }

    @Override
    public void deleteUser(Long userId) {
        userRepository.deleteById(userId);
    }

    @Override
    public UserDto updateUser(Long userId, UserDto userDto) {
        User user = userRepository.findById(userId).orElseThrow(() -> new UsernameNotFoundException("Invalid user"));
        user.setFirst_name(userDto.getFirst_name());
        user.setLast_name(userDto.getLast_name());
        user.setUsername(userDto.getUsername());
        user.setPassword(userDto.getPassword());
        user.setBio(userDto.getBio());
        user.setFollowedUsers(userDto.getFollowedUsers());

        userRepository.save(user);

        return UserMapper.mapUserDto(user);
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByUsername(username);
        if (user == null) {
            throw new UsernameNotFoundException("Invalid username");
        }
        return org.springframework.security.core.userdetails.User.withUsername(
                user.getUsername()).password(user.getPassword()).authorities("USER").build();
    }
    @Override
    public UserDto login(UserDto userDto) {
        User user = userRepository.findByUsername(userDto.getUsername());
        if (user != null && passwordEncoder.matches(userDto.getPassword(), user.getPassword())) {
            return UserMapper.mapUserDto(user);
        }
        return null;
    }
}
