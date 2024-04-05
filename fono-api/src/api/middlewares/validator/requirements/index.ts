import mainRequirement from './main'
import usersRequirement from './users'
import adminsRequirement from './admins'
import errosFonologicosRequirement from './errosFonologicos'

export default {
    ...mainRequirement,
    ...usersRequirement,
    ...adminsRequirement,
    ...errosFonologicosRequirement
}
