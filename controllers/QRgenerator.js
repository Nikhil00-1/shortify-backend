const QRcode = require("qrcode")
const { Qrs } = require("../Model/Qrmodel")
const {cloudinary}=require("../CloudConfig")

const handleNewQR = async (req, res) => {
    try {
        const url = req.body.url
        if (!url) {
            return res.status(404).json({ error: "URL is required" });
        }

        const isValidUrl = (string) => {
            try {
                new URL(string);
                return true;
            } catch {
                return false;
            }
        };
        const isValidUrl2 = (string) => {
            const pattern = /^(https?:\/\/)?([\w-]+\.)+[\w-]{2,}(\/[\w-]*)*\/?$/;
            console.log(pattern.test(string));
            return pattern.test(string);
        };
        if (!isValidUrl(url) && !isValidUrl2(url)) {
            return res.json({ message: "Enter Valid URL" });
        }

        const qrImg = await QRcode.toDataURL(url, {
            color: {
                dark: "#000000",
                light: "#ffffff",
            },
            width: 300,
            margin: 2,
        });

        const uploadRes = await cloudinary.uploader.upload(qrImg, {
            folder: "shortify_qrcodes",
        });

        const result = await Qrs.create({
            url: url,
            CloudUrl:uploadRes.secure_url,
            visitHistory: [],
            createdBy: req.user._id,
        });

        res.json({ qrImg })
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to laod QR code" })
    }
};

module.exports = { handleNewQR };
