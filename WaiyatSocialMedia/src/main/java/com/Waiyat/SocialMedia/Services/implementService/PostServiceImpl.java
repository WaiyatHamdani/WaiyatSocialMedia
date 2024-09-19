package com.Waiyat.SocialMedia.Services.implementService;

import com.Waiyat.SocialMedia.DTO.PostDto;
import com.Waiyat.SocialMedia.Mapper.PostMapper;
import com.Waiyat.SocialMedia.Models.Post;
import com.Waiyat.SocialMedia.Models.User;
import com.Waiyat.SocialMedia.Repositories.PostRepository;
import com.Waiyat.SocialMedia.Repositories.UserRepository;
import com.Waiyat.SocialMedia.Services.PostServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class PostServiceImpl implements PostServices {
    @Autowired
    private PostRepository postRepository;

    @Autowired
    private UserRepository userRepository;

    public PostServiceImpl(PostRepository postRepository, UserRepository userRepository) {
        this.postRepository = postRepository;
        this.userRepository = userRepository;
    }

    @Override
    public PostDto createPost(PostDto postDto) {
        System.out.println("Here!\n");
        User user = userRepository.findById(postDto.getUser().getUser_id()).orElseThrow(() -> new RuntimeException("no user found with this Id"));
        Post post = PostMapper.mapPost(postDto, user);
        Post savedPost = postRepository.save(post);
        return PostMapper.mapToPostDto(savedPost);
    }

    @Override
    public List<PostDto> getAllPosts() {
        List<Post> posts = postRepository.findAll();
        return posts.stream().map(post -> PostMapper.mapToPostDto(post)).collect(Collectors.toList());
    }

    @Override
    public PostDto getPostById(Long postId) {
        Post post = postRepository.findById(postId).orElseThrow(() -> new RuntimeException("no post found"));
        return PostMapper.mapToPostDto(post);
    }

    @Override
    public List<PostDto> getAllPostsByUserId(Long userId){
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("no user found with this Id"));
        List<Post> posts = postRepository.findByUser(user);
        return posts.stream().map(post -> PostMapper.mapToPostDto(post)).collect(Collectors.toList());
    }

    @Override
    public void deletePost(Long postId) {
        postRepository.deleteById(postId);
    }

    @Override
    public PostDto updatePost(Long post_id, PostDto postDto) {
        Post post = postRepository.findById(post_id).orElseThrow(() -> new RuntimeException("no post found"));
        post.setMessage(postDto.getMessage());
        postRepository.save(post);
        return PostMapper.mapToPostDto(post);
    }

    @Override
    public PostDto likePost(Long postId) {
        Post post = postRepository.findById(postId).orElseThrow(() -> new RuntimeException("no post found"));
        post.setLikes(post.getLikes() + 1);
        postRepository.save(post);
        return PostMapper.mapToPostDto(post);
    }

    @Override
    public PostDto sharePost(Long postId) {
        Post post = postRepository.findById(postId).orElseThrow(() -> new RuntimeException("no post found"));
        post.setShares(post.getShares() + 1);
        postRepository.save(post);
        return PostMapper.mapToPostDto(post);
    }

    @Override
    public PostDto commentPost(Long postId, String comment) {
        Post post = postRepository.findById(postId).orElseThrow(() -> new RuntimeException("no post found"));
        post.getComments().add(comment);
        postRepository.save(post);
        return PostMapper.mapToPostDto(post);
    }


}
