import Contact  from "../db/models/contactModel.js";

const getContacts = async (req, res) =>{
    const {_id: owner}=req.user;

    const contacts = await Contact.find({owner});

    res.json(contacts)
}

const addContact = async (req, res)=>{
    const {name, number} = req.body;
    const {_id: owner} = req.user;
      try {
        const contactName = await Contact.findOne({name});
        if(contactName){
            res.status(409).json({message: "A contact with that name already exists"})
        }
        const newContact = new Contact({name, number, owner});
        await newContact.save();
        res.status(201).json({
            name,
            number,
            owner
        })

      } catch (error) {
        res.status(500).json({message: error.message})
      }
    

    

}

export default{
    getContacts,
    addContact
}