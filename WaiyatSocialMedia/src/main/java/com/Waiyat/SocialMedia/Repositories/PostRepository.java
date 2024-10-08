package com.Waiyat.SocialMedia.Repositories;

import com.Waiyat.SocialMedia.Models.Post;
import com.Waiyat.SocialMedia.Models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PostRepository extends JpaRepository<Post, Long> {
    List<Post> findByUser(User user);
}
