import * as dotenv from 'dotenv';
dotenv.config();

import User from '../api/models/User'
import Admin from '../api/models/Admin'
import ErroFonologico from '../api/models/ErroFonologico'

const syncConfig = { alter: true, force: true, drop: false }

const syncTables = () => Promise.all([
    User.sync(syncConfig),
    Admin.sync(syncConfig),
    ErroFonologico.sync(syncConfig),
])


syncTables()
    .then((result) => console.log(result))
    .catch((error) => console.log(error))
    .finally(() => process.exit());
