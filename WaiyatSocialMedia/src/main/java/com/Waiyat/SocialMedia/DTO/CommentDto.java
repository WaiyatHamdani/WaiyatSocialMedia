package com.Waiyat.SocialMedia.DTO;

public class CommentDto {
    private String comments;
    private  int post_post_id;
    private int Userid;

    public CommentDto() {
    }

    public CommentDto(String comments, int post_post_id, int userid) {
        this.comments = comments;
        this.post_post_id = post_post_id;
        Userid = userid;
    }

    public String getComments() {
        return comments;
    }

    public void setComments(String comments) {
        this.comments = comments;
    }

    public int getPost_post_id() {
        return post_post_id;
    }

    public void setPost_post_id(int post_post_id) {
        this.post_post_id = post_post_id;
    }

    public int getUserid() {
        return Userid;
    }

    public void setUserid(int userid) {
        Userid = userid;
    }
}
