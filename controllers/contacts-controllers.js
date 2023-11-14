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
            _id: newContact._id,
            name,
            number,
            owner,
        })

      } catch (error) {
        res.status(500).json({message: error.message})
      }
}


const deleteContact = async(req, res)=>{
     const {contactId} = req.params;
     console.log(contactId)
    try {
      const contact = await Contact.findById(contactId);
      if(!contact){
        res.status(404).json({message: "There is no such user collection."})
        return
      }
      await Contact.findByIdAndDelete(contactId)
      res.status(200).json(contact)
    } catch (error) {
      res.status(500).json({message: error.message})
    }

}
export default{
    getContacts,
    addContact,
    deleteContact
  }