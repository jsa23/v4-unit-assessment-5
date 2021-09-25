select p.id as post_id, title, content, img, profile_pic, date_created, username as author_username from helo_posts p
join helo_users u on post_id = u.id
where title ilike $1 and u.id != $2
order by date_created asc;
