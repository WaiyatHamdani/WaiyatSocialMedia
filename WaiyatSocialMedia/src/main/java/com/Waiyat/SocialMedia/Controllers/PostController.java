package com.Waiyat.SocialMedia.Controllers;


import com.Waiyat.SocialMedia.DTO.PostDto;
import com.Waiyat.SocialMedia.Services.PostServices;
import com.Waiyat.SocialMedia.Services.UserServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "/posts")
@CrossOrigin(
        origins = {"http://localhost:3000"},
        allowCredentials = "true"
)
public class PostController {

    @Autowired
    private PostServices postService;
    @Autowired
    private UserServices userService;

    @PostMapping
    public ResponseEntity<PostDto> createPost(@RequestBody PostDto postDto) {
        return new ResponseEntity<>(postService.createPost(postDto), HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<PostDto>> getAllPosts() {
        List<PostDto> postDtos = postService.getAllPosts();
        return ResponseEntity.ok(postDtos);
    }

    @GetMapping("/{id}")
    public ResponseEntity<PostDto> getPostById(@PathVariable Long id) {
        PostDto postDto = postService.getPostById(id);
        return ResponseEntity.ok(postDto);
    }

    @GetMapping("/{username}")
    public ResponseEntity<List<PostDto>> getAllUsersPosts(@PathVariable String username) {
        List<PostDto> postDtos = postService.getAllPostsByUserId(userService.getUserByUsername(username).getUser_id());
        return ResponseEntity.ok(postDtos);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deletePost(@PathVariable Long id) {
        postService.deletePost(id);
        return ResponseEntity.ok("Post deleted");
    }

    @PutMapping("/{id}")
    public ResponseEntity<PostDto> updatePost(@PathVariable Long id, @RequestBody PostDto postDto) {
        PostDto updatedPost = postService.updatePost(id, postDto);
        return ResponseEntity.ok(updatedPost);
    }

    @PutMapping("/{id}/like")
    public ResponseEntity<String> likePost(@PathVariable Long id) {
        postService.likePost(id);
        return ResponseEntity.ok("Post liked");
    }

    @PutMapping("/{id}/share")
    public ResponseEntity<String> sharePost(@PathVariable Long id) {
        postService.sharePost(id);
        return ResponseEntity.ok("Post shared");
    }

    @PutMapping("/{id}/comment")
    public ResponseEntity<String> commentPost(@PathVariable Long id, @RequestBody String comment) {
        postService.commentPost(id, comment);
        return ResponseEntity.ok("Commented");
    }
}
