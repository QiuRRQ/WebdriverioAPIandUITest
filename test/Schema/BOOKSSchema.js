const BOOKSSchema = {
    "type": "object",
    "properties": {
        "books": {
            "type": "array",
            "items": [
                {
                    "type": "object",
                    "properties": {
                        "isbn": {
                            "type": "string"
                        }
                    },
                    "required": [
                        "isbn"
                    ]
                }
            ]
        }
    },
    "required": [
        "books"
    ]
};
module.exports = BOOKSSchema;