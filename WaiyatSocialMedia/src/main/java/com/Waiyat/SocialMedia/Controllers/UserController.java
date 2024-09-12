package com.Waiyat.SocialMedia.Controllers;

import com.Waiyat.SocialMedia.DTO.PostDto;
import com.Waiyat.SocialMedia.DTO.UserDto;
import com.Waiyat.SocialMedia.Services.PostServices;
import com.Waiyat.SocialMedia.Services.UserServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "/users")
//@CrossOrigin(origins = "*")
@CrossOrigin(
        origins = {"http://localhost:3000"},
        allowCredentials = "true"
)

public class UserController {
    @Autowired
    private UserServices userService;

    @Autowired
    private PostServices postService;

    @PostMapping
    public ResponseEntity<UserDto> registerUser(@RequestBody UserDto userDto){
        return new ResponseEntity<>(userService.registration(userDto), HttpStatus.CREATED);
    }

    @PostMapping("/login")
    public ResponseEntity<UserDto> loginUser(@RequestBody UserDto userDto) {
        UserDto authenticatedUser = userService.login(userDto);
        if (authenticatedUser != null) {
            return ResponseEntity.ok(authenticatedUser);
        } else {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
    }

    @GetMapping
    public ResponseEntity<List<UserDto>> getAllUser(){
        List<UserDto> users = userService.getAllUsers();
        return ResponseEntity.ok(users);
    }

    @GetMapping("/{username}")
    public ResponseEntity<UserDto> getUserByUsername(@PathVariable String username) {
        UserDto user = userService.getUserByUsername(username);
        return ResponseEntity.ok(user);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteUser(@PathVariable("id") Long userId) {
        userService.deleteUser(userId);
        return ResponseEntity.ok("Successfully deleted user " + userId);
    }

    @PutMapping("/{id}")
    public ResponseEntity<UserDto> updateUser(@PathVariable("id") Long userId, @RequestBody UserDto userDto) {
        UserDto updatedUser = userService.updateUser(userId, userDto);
        return ResponseEntity.ok(updatedUser);
    }

    @PostMapping("/posts/{user_id}")
    public ResponseEntity<PostDto> createPostFromUser(@PathVariable Long user_id, @RequestBody PostDto postDto) {
        postDto.setUser(postDto.getUser());
        return new ResponseEntity<>(postService.createPost(postDto), HttpStatus.CREATED);
    }


    @DeleteMapping("/posts/{user_id}/{post_id}")
    public ResponseEntity<String> deletePost(@PathVariable Long post_id) {
        postService.deletePost(post_id);
        return ResponseEntity.ok("Post deleted");
    }

    @PutMapping("/posts/{user_id}/{post_id}")
    public ResponseEntity<String> updatePost(@PathVariable Long post_id, @RequestBody PostDto postDto) {
        PostDto updatedPost = postService.updatePost(post_id, postDto);
        return ResponseEntity.ok("Post updated");
    }

    @PutMapping("/posts/{user_id}/{post_id}/like")
    public ResponseEntity<String> likePost(@PathVariable Long post_id) {
        postService.likePost(post_id);
        return ResponseEntity.ok("Post liked");
    }

    @PutMapping("/posts/{user_id}/{post_id}/share")
    public ResponseEntity<String> sharePost(@PathVariable Long post_id) {
        postService.sharePost(post_id);
        return ResponseEntity.ok("Post shared");
    }

    @PostMapping("/posts/{user_id}/{post_id}/comment")
    public ResponseEntity<String> commentPost(@PathVariable Long post_id, @RequestBody String comment) {
        postService.commentPost(post_id, comment);
        return new ResponseEntity<>(comment, HttpStatus.CREATED);
    }
}
