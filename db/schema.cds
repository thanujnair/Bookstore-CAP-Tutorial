using {
    cuid,
    managed,
    sap.common.Currencies,
//sap.common.Languages,
} from '@sap/cds/common';

using {Attachments} from '@cap-js/attachments';

namespace tutorial.db;

entity Books : cuid, managed {
    title       : String;
    author      : Association to Authors;
    //author   : Association to many Authors2Books on author.book = $self;
    genre       : Association to Genres;
    publishedAt : Date;
    pages       : Integer;
    price       : Decimal(9, 2);
    currency    : Association to Currencies; //Association to Currencies entity in @sap/cds/common
    //language    : Association to Languages; //Association to Languages entity in @sap/cds/common
    stock       : Integer;
    status      : Association to BookStatus;
    Chapters    : Composition of many Chapters //Upper case used to denote Composition
                      on Chapters.book = $self;
}

type Genre : String enum {
    Horror = 'Horror';
    Romance = 'Romance';
    Non_Fiction = 'Non-Fiction';
    Art = 'Art';
}


entity Genres {
    key code        : Genre;
        description : String;
}

entity BookStatus {
    key code        : String(1) enum {
            Available = 'A';
            Low_Stock = 'L';
            Unavailable = 'U';
        }
        //key code : BookStatusCode;
        criticality : Integer;
        displayText : String;
}

/*
type BookStatusCode : String(1) enum {
    Available = 'A';
    Low_Stock = 'L';
    Unavailable = 'U';
}
*/

entity Authors : cuid, managed {
    name        : String;
    books       : Association to many Books
                      on books.author = $self;
    fileName    : String;
    fileType    : String      @Core.IsMediaType; // Tells Application Programming Model that this property is a media type
    content     : LargeBinary @Core.MediaType                  : fileType // Tells Application Programming Model which property has the file type
                              //@Core.AcceptableMediaTypes       : [ 'application/pdf','application/vnd.ms-excel' ] //Filter types of acceptable file formats
                              @Core.ContentDisposition.Filename: fileName;
    attachments : Composition of many Attachments;
//books : Association to many Authors2Books
//on books.author = $self;
}

entity Chapters : cuid, managed {
    key book   : Association to Books;
        number : Integer;
        title  : String;
        pages  : Integer;

}

/* Many to Many Associations achieved by adding a Link Entity
entity Authors2Books : cuid {
    book : Association to Books;
    author : Association to Authors;
}
*/
