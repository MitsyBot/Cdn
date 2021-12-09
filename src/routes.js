const { Router } = require('express')
const { multer } = require("./util/multer");
const isAuth = require("./middlewares/isAuth")

const Attachment = require('./controller/attachment.controller')
const Background = require('./controller/background.controller')
const Fanart = require('./controller/fanarts.controller')
const PublicBadge = require('./controller/public.badges.controller')
const PublicBackground = require('./controller/public.background.controller')
const Badge = require('./controller/badge.controller')

const router = Router()


// Anexos pro sistema de sugestões
router.post('/public/attachments/:user_id/', multer.single("file"), Attachment.postImage);
router.get('/public/attachments/:user_id/:filename', Attachment.getImage)
router.delete('/public/attachments/:user_id/:filename', isAuth, Attachment.deleteImage)

// Maneira com que o jeremias vai enviar novos backgrounds para a pasta
router.post('/background/', multer.single("file"), isAuth, Background.postMitsyBackground);
router.get('/background/:filename', Background.getBackground)
router.delete('/background/:filename', isAuth, Background.deleteBackground)

// Maneira com que o jeremias vai enviar novos badges para a pasta
router.post('/badge/', multer.single("file"), isAuth, Badge.postMitsyBadge);
router.get('/badge/:filename', Badge.getBadge)
router.delete('/badge/:filename', isAuth, Badge.deleteBadge)


// Maneira com que a mitsy vai enviar e pegar fanarts do website
router.post('/fanart/:user_id', multer.single("file"), isAuth, Fanart.postFanart);
router.get('/fanart/:user_id/:filename', Fanart.getFanart)
router.delete('/fanart/:user_id/:filename', isAuth, Fanart.deleteFanart)

// Maneira com que a mitsy vai pegar e enviar badges publicas do website
router.post('/public/badge/:guild_id', multer.single("file"), PublicBadge.postBadge);
router.get('/public/badge/:guild_id/:filename', PublicBadge.getBadge)
router.delete('/public/badge/:guild_id/:filename', PublicBadge.deleteBadge)

// Maneira com que a mitsy vai pegar e enviar backgrounds publicos do website
router.post('/public/background/:user_id', multer.single("file"), PublicBackground.postBackground);
router.get('/public/background/:user_id/:filename', PublicBackground.getBackground)
router.delete('/public/background/:user_id/:filename', PublicBackground.deleteBackground)

module.exports = router
