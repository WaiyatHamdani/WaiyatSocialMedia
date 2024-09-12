package com.Waiyat.SocialMedia.Mapper;


import com.Waiyat.SocialMedia.DTO.UserDto;
import com.Waiyat.SocialMedia.Models.User;

public class UserMapper {

    public static User mapUser(UserDto userDto){
        if (userDto == null){
            return null;
        }
        return new User(userDto.getUser_id(), userDto.getUsername(), userDto.getPassword(), userDto.getFirst_name(), userDto.getLast_name(), userDto.getBio(), userDto.getFollowedUsers());
    }

    public static UserDto mapUserDto(User user){
        if (user == null){
            return null;
        }
        return new UserDto(user.getUser_id(), user.getUsername(), user.getPassword(), user.getFirst_name(), user.getLast_name(), user.getBio(), user.getFollowedUsers());
    }
}
