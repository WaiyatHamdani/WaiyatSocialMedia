package com.Waiyat.SocialMedia.Services;

import com.Waiyat.SocialMedia.DTO.PostDto;

import java.util.List;

public interface PostServices {
    PostDto createPost(PostDto postDto);
    List<PostDto> getAllPosts();
    PostDto getPostById(Long postId);
    void deletePost(Long postId);
    PostDto updatePost(Long post_id, PostDto postDto);
    PostDto likePost(Long postId);
    PostDto sharePost(Long postId);
    PostDto commentPost(Long postId, String comment);
    List<PostDto> getAllPostsByUserId(Long userId);
}
