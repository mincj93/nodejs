create table nodeboard (
    brd_idx number(5) not null  PRIMARY key,
    brd_title VARCHAR2(30) not null,
    brd_content VARCHAR2(300),
    brd_writer VARCHAR2(30),
    brd_regdate date
);

