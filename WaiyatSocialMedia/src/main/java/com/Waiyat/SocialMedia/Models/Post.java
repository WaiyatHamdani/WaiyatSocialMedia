package com.Waiyat.SocialMedia.Models;

import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name ="posts")
public class Post {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long post_id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
    private String message;
    private int likes;
    private int shares;

    @ElementCollection
    private List<String> comments;

    public Post() {
    }

    public Post(User user, String message, int likes, int shares, List<String> comments) {
        this.user = user;
        this.message = message;
        this.likes = likes;
        this.shares = shares;
        this.comments = comments;
    }

    public Post(Long post_id, User user, String message, int likes, int shares, List<String> comments) {
        this.post_id = post_id;
        this.user = user;
        this.message = message;
        this.likes = likes;
        this.shares = shares;
        this.comments = comments;
    }

    public Post(Long post_id, String message, int likes, int shares, List<String> comments) {
        this.post_id = post_id;
        this.message = message;
        this.likes = likes;
        this.shares = shares;
        this.comments = comments;
    }

    public Long getPost_id() {
        return post_id;
    }

    public void setPost_id(Long post_id) {
        this.post_id = post_id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
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

    @Override
    public String toString() {
        return "Post{" +
                "post_id=" + post_id +
                ", user=" + user +
                ", message='" + message + '\'' +
                ", likes=" + likes +
                ", shares=" + shares +
                ", comments=" + comments +
                '}';
    }
}
