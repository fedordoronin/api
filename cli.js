const program = require("commander");
const mongoose = require('mongoose');
const bluebird = require("bluebird");
const color = require('colors');

const u = require('./dest/app/components/user/user.service');
const r = require('./dest/app/components/role/role.service');

const conf = require('./config.json');

program
    .command('create:admin <name> <phone> <email> <password>')
    .description('Create admin user.')
    .action(createAdminUser);
    
program.parse(process.argv);

/**
 * Create Admin user
 */
function createAdminUser (name, phone, email, password) {
    console.log(name, phone, email, password);
    
    dbConnect()
        .then(res => {

            try {
                var role = r.RoleService.getRoleByValue('ROLE_ADMIN');
            } catch (error) {
                throw error
            }

            role.then(res => {
                if (res.length === 0 || !role) {
                    console.log(color.red('ERROR: ', color.yellow('Role not found')));
                } else {
                    
                    try {
                        var user = u.UserService.create({ name, phone, email, password, _access: res });
                    } catch (error) {
                        throw error
                    }
                    
                    user.then(res => {
                        console.log(color.green('Admin user created!'));
                    })
                    .catch(err => {
                        console.log(color.red('ERROR: ') + color.yellow(err.message));
                    });
                }
            });

        })
        .catch(err => {
            throw err.message;
        })
}

/**
 * Connection database
 */
function dbConnect () {
    mongoose.Promise = bluebird;
    var dbServer = process.env.NODE_ENV === 'production' ? conf.db.cloud : conf.db.local;
    return mongoose.connect(dbServer, { useMongoClient: true });
}
