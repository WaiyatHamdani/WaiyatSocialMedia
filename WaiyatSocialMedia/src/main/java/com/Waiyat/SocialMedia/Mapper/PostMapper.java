package com.Waiyat.SocialMedia.Mapper;


import com.Waiyat.SocialMedia.DTO.PostDto;
import com.Waiyat.SocialMedia.Models.Post;
import com.Waiyat.SocialMedia.Models.User;

public class PostMapper {
    public static Post mapPost(PostDto postDto, User user){
        return new Post(postDto.getPost_id(), user, postDto.getMessage(), postDto.getLikes(), postDto.getShares(), postDto.getComments());
    }

    public static PostDto mapToPostDto(Post post){
        return new PostDto(post.getPost_id(), post.getMessage(), post.getLikes(), post.getShares(), post.getComments(), post.getUser());
    }
}
