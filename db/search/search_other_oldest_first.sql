select post_id as helo_posts id, title, content, img, profile_pic, date_created, author_username as helo_posts username from helo_posts p
join helo_users u on u.id = p.author_id
where author_id != $1
order by date_created asc;
