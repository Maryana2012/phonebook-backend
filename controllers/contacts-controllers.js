import Contact  from "../db/models/contactModel.js";

const getContacts = async (req, res) =>{
    const {_id: owner}=req.user;

    const contacts = await Contact.find({owner});

    res.json({contacts})
}

const addContact = async (req, res)=>{
    const {name, number} = req.body;
    const {owner} = req.user;

    

}

export default{
    getContacts
}