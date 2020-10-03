export class AdminRepository {
    
    constructor(apiManager, preferences) {
        this.apiManager = apiManager
        this.preferences = preferences
    }

    async register(data) {
        try {
            const response = await this.apiManager.registerUser(data)
            return response
        } catch (error) {
            throw error
        }
    }

    async signin(data) {
        try {
            const response = await this.apiManager.signinUser(data)
            return response
        } catch (error) {
            throw error
        }
    }

}