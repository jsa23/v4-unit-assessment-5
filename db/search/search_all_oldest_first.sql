select helo_post.id as post_id, title, content, img, profile_pic, date_created, username as author_username from helo_posts 
join helo_users ON post_id = helo_users.id
where title ilike $1
order by date_created asc;