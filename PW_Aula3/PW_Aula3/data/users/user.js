let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let scopes = require('./scopes');

let RoleSchema = new Schema ({
    name: { type: String, required: true},
    scopes: [{ type: String, enum: [scopes['read-all'], scopes['read-posts'], scopes['manage-postsmanage-posts']]}]
});

let UserSchema = new Schema ({
    name: {type: String, required: true, unique: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    role: {type: RoleSchema}
});

let User = mongoose.model('User', UserSchema);

module.exports = User;