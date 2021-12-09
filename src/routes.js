const { Router } = require('express')
const { multer } = require("./util/multer");
const isAuth = require("./middlewares/isAuth")

const Attachment = require('./controller/attachment.controller')
const Background = require('./controller/background.controller')
const Fanart = require('./controller/fanarts.controller')
const CommunityBadge = require('./controller/community.badges.controller')
const CommunityBackground = require('./controller/community.background.controller')
const Badge = require('./controller/badge.controller')

const router = Router()


// Anexos pro sistema de sugestões
router.post('/community/attachments/:user_id/', multer.single("file"), Attachment.postImage);
router.get('/community/attachments/:user_id/:filename', Attachment.getImage)
router.delete('/community/attachments/:user_id/:filename', isAuth, Attachment.deleteImage)

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

// Maneira com que a mitsy vai pegar e enviar badges communityas do website
router.post('/community/badge/:guild_id', multer.single("file"), CommunityBadge.postBadge);
router.get('/community/badge/:guild_id/:filename', CommunityBadge.getBadge)
router.delete('/community/badge/:guild_id/:filename', CommunityBadge.deleteBadge)

// Maneira com que a mitsy vai pegar e enviar backgrounds communityos do website
router.post('/community/background/:user_id', multer.single("file"), CommunityBackground.postBackground);
router.get('/community/background/:user_id/:filename', CommunityBackground.getBackground)
router.delete('/community/background/:user_id/:filename', CommunityBackground.deleteBackground)

module.exports = router
