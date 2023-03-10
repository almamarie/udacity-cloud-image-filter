require("dotenv").config();
import express, { Request, response, Response } from "express";
import bodyParser from "body-parser";
import { filterImageFromURL, deleteLocalFiles, validateUrl } from "./util/util";
import { requireAuth } from "./util/auth";

(async () => {
  // Init the Express application
  const app = express();

  // Set the network port
  const port = process.env.PORT || 8082;

  // Use the body parser middleware for post requests
  app.use(bodyParser.json());

  // @TODO1 IMPLEMENT A RESTFUL ENDPOINT
  // GET /filteredimage?image_url={{URL}}
  // endpoint to filter an image from a public url.
  // IT SHOULD
  //    1
  //    1. validate the image_url query
  //    2. call filterImageFromURL(image_url) to filter the image
  //    3. send the resulting file in the response
  //    4. deletes any files on the server on finish of the response
  // QUERY PARAMATERS
  //    image_url: URL of a publicly accessible image
  // RETURNS
  //   the filtered image file [!!TIP res.sendFile(filteredpath); might be useful]

  /**************************************************************************** */

  app.get(
    "/filteredimage/",
    // requireAuth,
    async (req: Request, res: Response) => {
      const image_url = req.query.image_url as string;
      console.log(req.query.image_url);

      // validate the image_url query

      if (!validateUrl(image_url)) {
        return res.status(400).send("invalid url");
      }
      // call filterImageFromURL(image_url) to filter the image
      try {
        const filteredUrl = await filterImageFromURL(image_url);

        // send the resulting file in the response
        res.sendFile(filteredUrl);

        // deletes any files on the server on finish of the response
        // deleteLocalFiles([filteredUrl]);
      } catch (error) {
        console.error("error occured", error);
        return res.status(400).send("Bad request.please try again");
      }
    }
  );

  // app.get("/filter-here", async (req: Request, res: Response) => {
  //   //    1. validate the image_url query
  //   const imageUrl = req.params.image_url;

  //   if (!validateUrl(imageUrl)) {
  //     return res.status(400).send("invalid url");
  //   }

  //   //    2. call filterImageFromURL(image_url) to filter the image

  //   try {
  //     const filteredImage = await filterImageFromURL(imageUrl);

  //     //    3. send the resulting file in the response
  //     res.sendFile(filteredImage);
  //   } catch (error) {
  //     return res
  //       .status(400)
  //       .send("An error occured during processing of image.");
  //   }

  //   //    4. deletes any files on the server on finish of the response
  // });

  //! END @TODO1

  // Root Endpoint
  // Displays a simple message to the user
  app.get("/", async (req: Request, res: Response) => {
    res.send("try GET /filteredimage?image_url={{}}");
  });

  // Start the Server
  app.listen(port, () => {
    console.log(`server running http://localhost:${port}`);
    console.log(`press CTRL+C to stop server`);
  });
})();
