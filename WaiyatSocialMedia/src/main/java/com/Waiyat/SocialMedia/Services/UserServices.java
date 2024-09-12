package com.Waiyat.SocialMedia.Services;

import com.Waiyat.SocialMedia.DTO.UserDto;

import java.util.List;

public interface UserServices {
    UserDto registration(UserDto userDto);

    List<UserDto> getAllUsers();

    UserDto getUserByUsername(String username);

    void deleteUser(Long userId);

    UserDto updateUser(Long userId, UserDto userDto);

    UserDto login(UserDto userDto);
}
