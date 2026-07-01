using BookstoreService as service from '../../srv/service';
annotate service.Authors with @(
    UI.Facets : [
        {
            $Type : 'UI.ReferenceFacet',
            Label : 'eBook',
            ID : 'eBook',
            Target : '@UI.FieldGroup#eBook',
        },
        {
            $Type : 'UI.ReferenceFacet',
            Label : 'Book Info',
            ID : 'BookInfo',
            Target : '@UI.FieldGroup#BookInfo',
        },
    ],
    UI.FieldGroup #eBook : {
        $Type : 'UI.FieldGroupType',
        Data : [
            {
                $Type : 'UI.DataField',
                Value : content,
                Label : 'eBook File',
            },
        ],
    },
    UI.LineItem : [
        {
            $Type : 'UI.DataField',
            Value : name,
            Label : 'Author Name',
        },
    ],
    UI.FieldGroup #BookInfo : {
        $Type : 'UI.FieldGroupType',
        Data : [
            {
                $Type : 'UI.DataField',
                Value : bookCount,
                Label : 'Book Count',
            },
        ],
    },
);

