const query = {};

// nodeboard 목록조회
query.selectList = `
    select 
        * 
    from 
        nodeboard
    `;



// nodeboard 게시물 1개 생성
query.insertOne = `
    insert into nodeboard 
        (
            brd_idx
            , brd_title
            , brd_content
            , brd_writer
            , brd_regdate
        )
        values
        (
            nodeboard_seq.NEXTVAL 
            , :brd_title
            , :brd_content
            , :brd_writer
            , to_char(sysdate, 'YYYYMMDDHH24MISS')
        )
    `;



module.exports = query;