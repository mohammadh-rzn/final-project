const User = require("../models/user");

const intialization = async () => {
    try {
        const EXIST_ADMIN = await User.findOne({role: 'admin'});
        if (EXIST_ADMIN) {
            return console.log('Admin already created');
        };
        
        const ADMIN = new User({
            firstName: 'Reza',
            lastName: 'Mavadat',
            userName: 'Reza',
            mobile: '09125544712',
            sex: 'male',
            role: 'admin',
            password: '12345678'
        });

        await ADMIN.save();

        console.log('Admin created');
    } catch (err) {
        console.log('Error in intialization function', err);
    };
};



module.exports = intialization;









