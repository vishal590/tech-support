import ticketModel from "../models/ticket.model.js"; 
import colors from 'colors'
import userModel from "../models/user.model.js";
import assignTechSupportModel from "../models/assignTechSupport.model.js"; 


export const ticketController = async(req, res) => {
    try{
        // const {query, file, createdBy} = req.body;
        const {query, createdBy, userName} = req.body;
        // const {query} = req.body;

        const newTicket = new ticketModel({
            query,
            // file,
            createdBy, 
            userName,
            status: 'incomplete'
        })

        const savedTicket = await newTicket.save();

        res.status(201).send({
            success: true,
            message: 'Ticket submitted successfully',
            ticket: savedTicket,
        })
    }catch(error){
        console.error("Error while submitting ticket:", error);
        res.status(500).send({
            success: false,
            message: "Something went wrong. Please try again later.",
            error,
        })
    }
}

export const getAllTicketController = async(req, res) => {
    try{
        const createdBy = req.params.createdBy;
        const role = req.headers.role;
        console.log(`${createdBy} and ${role}`.bgBlue);
        let tickets;

        if(role === 'admin'){
            tickets = await ticketModel.find();
        }else if(role === 'tech_support'){
            tickets = await ticketModel.find({techSupport: createdBy});
        }else if(role === 'user'){
            tickets = await ticketModel.find({createdBy: createdBy});

        }
        

        res.status(200).send({
            success: true,
            message: 'Tickets retrieved successfully',
            tickets: tickets,
        })
    }catch(error){
        console.log('Error while fetching tickets:', error);
        res.status(500).send({
            status: false,
            message: 'Internal Server Error',
            error,
        })
    }
}

export const getTicketController = async(req, res) => {
    try{
        console.log(`params id: ${req.params.id}`.bgBlue)
        const ticket = await ticketModel.findById(req.params.id);
        if(!ticket) {
            return res.status(404).send({
                success: false,
                message: 'Ticket not found',
            })
        }
        res.status(200).send({
            success: true,
            message: 'Ticket retrieve successfully',
            ticket,
        })
    }catch(error){
        console.log('Error while fetching ticket:', error);
        res.status(500).send({
            success: false,
            message: 'Internal Server Error',
            error,
        })
    }
}

export const updateStatusController = async(req, res) => {
    try{
        const {id} = req.params;
        const {status} = req.body;
        console.log(`${id} and ${status}`.bgBlue)

        const updatedTicket = await ticketModel.findByIdAndUpdate(id, {status}, {new: true});

        console.log(`updatedTicket instance: ${updatedTicket}`.bgBlue)

        if(!updatedTicket){
            console.log(`error in updated Ticket 404`.bgBlue)
            res.status(404).send({
                success: false,
                message: 'Ticket not found',
            })
        }

        res.status(200).send({
            success: true,
            message: 'Status updated Successfully',
            ticket: updatedTicket,
        })

    }catch(error){
        console.log(`Error in update Status:${error}`);
        res.status(500).send({
            status: false,
            message: 'Internal Server Error',
            error,
        })
    }
}

export const sendMessageController = async(req, res) => {
    try{
        const {message, sender, userName} = req.body;
        const {ticketId} = req.params;

        const ticket = await ticketModel.findById(ticketId);

        if(!ticket){
            return res.status(404).send({
                success: false,
                message: 'Ticket not found',
            })
        }

        const senderUser = await userModel.findById(sender)

        if (!senderUser) {
            return res.status(404).send({
                success: false,
                message: 'Sender user not found',
            });
        }

        console.log(`${senderUser.name}`.bgRed)

        ticket.messages.push({content: message, sender, userName});

        const updatedTicket = await ticket.save();
        // console.log(`updatedTicket: ${Array.isArray(updatedTicket?.messages)}`.bgGreen);
        // console.log(`updatedTicket: ${updatedTicket}`.bgGreen);

        res.status(200).send({
            success: true,
            message: 'Message sent successfully',
            messagesArray: updatedTicket?.messages,
            userName,
        })
    }catch(error){
        console.log('error in message send controller:', error);
        res.status(500).send({
            success: false,
            message: 'Internal Server error',
            error,
        })
    }
}

export const allTicketController = async(req, res) => {
    try{
        const tickets = await ticketModel.find();

        res.status(200).send({
            success: true,
            message: 'Tickets retrieved successfully',
            tickets: tickets,
        })
    }catch(error){
        console.log('Error while fetching tickets:', error);
        res.status(500).send({
            status: false,
            message: 'Internal Server Error',
            error,
        })
    }
}

export const assignTechSupportController = async (req, res) => {
    try {
        const { ticketId } = req.params;
        const { techSupport, techSupportName } = req.body;

        console.log(`${techSupport} , ${techSupportName}`.bgYellow)

        const assignTechSupport = new assignTechSupportModel({
            ticket: ticketId,
            techSupport: techSupport,
            techSupportName, techSupportName,
        });

        await assignTechSupport.save();
        const updatedTicket = await ticketModel.findByIdAndUpdate(ticketId,{
            $set:{
                techSupport: techSupport,
                techSupportName: techSupportName,
            }
        })

        // const updatedTicket = await ticketModel.findById(ticketId)


        res.status(200).send({
            success: true,
            message: 'Tech support assigned successfully',
            assignTechSupport: updatedTicket 
        });
    } catch (error) {
        console.error("Error assigning tech support:", error);
        res.status(500).send({
            success: false,
            message: "Internal Server Error",
            error,
        });
    }
};
