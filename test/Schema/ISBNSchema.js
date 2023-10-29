const ISBSchema = {
    "type": "object",
    "properties": {
        "$schema": {
            "type": "string"
        },
        "type": {
            "type": "string"
        },
        "properties": {
            "type": "object",
            "properties": {
                "userID": {
                    "type": "object",
                    "properties": {
                        "type": {
                            "type": "string"
                        }
                    },
                    "required": [
                        "type"
                    ]
                },
                "username": {
                    "type": "object",
                    "properties": {
                        "type": {
                            "type": "string"
                        }
                    },
                    "required": [
                        "type"
                    ]
                },
                "books": {
                    "type": "object",
                    "properties": {
                        "type": {
                            "type": "string"
                        },
                        "items": {
                            "type": "object"
                        }
                    },
                    "required": [
                        "type",
                        "items"
                    ]
                }
            },
            "required": [
                "userID",
                "username",
                "books"
            ]
        },
        "required": {
            "type": "array",
            "items": [
                {
                    "type": "string"
                },
                {
                    "type": "string"
                },
                {
                    "type": "string"
                }
            ]
        }
    },
    "required": [
        "$schema",
        "type",
        "properties",
        "required"
    ]
};

module.exports = ISBSchema;