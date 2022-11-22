class SupportTypes {
    static getSupportType = (type) => {
        const supportTypes = ["Agricultural Support","Technical Support","Report an Issue","Marketplace Support"]
        return supportTypes[type]
    }
}




module.exports.SupportTypes = SupportTypes
