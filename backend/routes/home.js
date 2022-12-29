const express = require('express');
const router = express.Router()


router.get('/', (req, res) => {
    const post = [
        {
          img: "https://stimg.cardekho.com/images/carexteriorimages/930x620/Tesla/Model-S/5252/1611840999494/front-left-side-47.jpg",
          title: "Tesla",
          description:
            "Model S is built from the ground up as an electric vehicle, with a high-strength architecture and floor-mounted battery pack for incredible occupant protection and low rollover risk.",
        },
        {
          img: "https://stimg.cardekho.com/images/carexteriorimages/930x620/Tesla/Tesla-Model-3/5100/1558500541732/front-left-side-47.jpg",
          title: "Tesla",
          description:
            "Model S is built from the ground up as an electric vehicle, with a high-strength architecture and floor-mounted battery pack for incredible occupant protection and low rollover risk.",
        },
        {
          img: "https://cdni.autocarindia.com/Utils/ImageResizer.ashx?n=https://cdni.autocarindia.com/News/20201230120133_tesla-model-3.jpg&c=0",
          title: "Tesla",
          description:
            "Model S is built from the ground up as an electric vehicle, with a high-strength architecture and floor-mounted battery pack for incredible occupant protection and low rollover risk.",
        },
      ];
    console.log('reached');
    
      res.status(200).json(post)
})




module.exports= router;