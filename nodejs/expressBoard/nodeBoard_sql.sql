create table nodeboard (
    brd_idx number(5) not null  PRIMARY key,
    brd_title VARCHAR2(30) not null,
    brd_content VARCHAR2(300),
    brd_writer VARCHAR2(30),
    brd_regdate VARCHAR2(14)
);

create SEQUENCE nodeboard_seq start with 1 increment by 1;

insert into nodeboard values (nodeboard_seq.NEXTVAL , 'nodeboard title1', '내용1' ,'글쓰니1', to_char(sysdate, 'YYYYMMDDHH24MISS'));

select * from nodeboard;

drop table nodeboard;

commit;

rollback;