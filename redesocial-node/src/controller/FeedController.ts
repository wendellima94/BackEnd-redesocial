import { Request, Response } from "express";
import { Authenticator } from "../services/Authenticator"
import { CreatePostDatabase } from "../data/CreatePostsDatabase"
import { BaseDatabase } from "../data/BaseDatabase"
import moment from "moment";



export const feed = async (req: Request, res: Response): Promise<any> => {
    try {
      const authenticator = new Authenticator()
      authenticator.getData(req.headers.authorization!)
  
      const postDb = new CreatePostDatabase()
      const postFeed = await postDb.getPosts()
      
      const feeds = postFeed.map((feed: any) => {
        feed.creation_date = moment(feed.creation_date).format("DD/MM/YYYY")
        return feed
      })
      
    
      res.status(200).send({
        feeds
      })
    } catch (err) {
      res.status(400).send({
        message: err.message
      })
    }
    BaseDatabase.destroyConnection()
  }
