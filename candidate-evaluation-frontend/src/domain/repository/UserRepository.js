export class UserRepository {
    
    constructor(apiManager, preferences) {
        this.apiManager = apiManager
        this.preferences = preferences
    }

    async addCandidate(data, userId) {
        try {
            const response = await this.apiManager.addCandidate(data)
            return response
        } catch (error) {
            throw error
        }
    }

    async getCandidates(rating) {
        try {
            const response = await this.apiManager.getCandidates(rating)
            return response
        } catch (error) {
            throw error
        }
    }

    async getCadidateDetails(candidateEmail){
        try {
            const response = await this.apiManager.getCadidateDetails(candidateEmail)
            return response
        } catch (error) {
            throw error
        }
    }

    async addComment(email,commentText){
        try {
            const response = await this.apiManager.addComment(email,commentText)
            return response
        } catch (error) {
            throw error
        }
    }

    async addRating(email,rating){
        try {
            const response = await this.apiManager.addRating(email,rating)
            return response
        } catch (error) {
            throw error
        }
    }

}
