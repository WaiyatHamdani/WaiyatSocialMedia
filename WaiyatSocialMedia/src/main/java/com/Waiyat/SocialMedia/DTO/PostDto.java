package com.Waiyat.SocialMedia.DTO;


import com.Waiyat.SocialMedia.Models.User;

import java.util.List;

public class PostDto {
    private Long post_id;
    private String message;
    private int likes;
    private int shares;
    private List<String> comments;
//    private User user;
    private User user;
    
    public PostDto() {
    }
    public PostDto(String message, int likes, int shares, List<String> comments, User user) {
        this.message = message;
        this.likes = likes;
        this.shares = shares;
        this.comments = comments;
        this.user = user;
    }
    public PostDto(Long post_id, String message, int likes, int shares, List<String> comments, User user) {
        this.post_id = post_id;
        this.message = message;
        this.likes = likes;
        this.shares = shares;
        this.comments = comments;
        this.user = user;
    }

    public Long getPost_id() {
        return post_id;
    }

    public void setPost_id(Long post_id) {
        this.post_id = post_id;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public int getLikes() {
        return likes;
    }

    public void setLikes(int likes) {
        this.likes = likes;
    }

    public int getShares() {
        return shares;
    }

    public void setShares(int shares) {
        this.shares = shares;
    }

    public List<String> getComments() {
        return comments;
    }

    public void setComments(List<String> comments) {
        this.comments = comments;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public String toString() {
        return "PostDto{" +
                "post_id=" + post_id +
                ", message='" + message + '\'' +
                ", likes=" + likes +
                ", shares=" + shares +
                ", comments=" + comments +
                ", user=" + user +
                '}';
    }
}
