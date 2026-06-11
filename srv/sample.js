//Before this action happens
this.before('READ', Books, async (req) => {} )

//During Action Handling
this.on('READ', Books, async (req, next) => {
    return next()
})

//After Action Handling
this.after('READ', Books, async( book, req ) => {})