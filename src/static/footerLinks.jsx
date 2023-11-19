import GitHubIcon from '@mui/icons-material/GitHub';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import RssFeedIcon from '@mui/icons-material/RssFeed';
import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

export const footerLinks = [
    {
        title: 'Github',
        icon: <GitHubIcon/>,
        link: 'https://github.com/pranaygoel02'
    },
    {
        title: 'Instagram',
        icon: <InstagramIcon/>,
        link: 'https://www.instagram.com/pranay_goel__/'
    },
    {
        title: 'LinkedIn',
        icon: <LinkedInIcon/>,
        link: 'https://www.linkedin.com/in/pranaygoel02/'
    },
    {
        title: 'Twitter',
        icon: <TwitterIcon/>,
        link: 'https://twitter.com/pranay_goel__'
    },
    {
        title: 'Portfolio',
        icon: <RssFeedIcon/>,
        link: 'https://pranaygoel.vercel.app/'
    },
]

export const shareLinks = [
    {
        title: 'Whatsapp',
        icon: <WhatsAppIcon/>,
        share: function(url,title) {
            let link = `https://api.whatsapp.com/send?text=${title} ${url}`
            return link;
        }
    },
    {
        title: 'Facebook',
        icon: <FacebookRoundedIcon/>,
        share: function(url) {
            let link = `https://www.facebook.com/sharer.php?u=${url}`
            return link;
        }
    },
    {
        title: 'LinkedIn',
        icon: <LinkedInIcon/>,
        share: function(url,title) {
            let link = `https://www.linkedin.com/shareArticle?url=${url}&title=${title}`
            return link;
        }
    },
    {
        title: 'Twitter',
        icon: <TwitterIcon/>,
        share: function(url,title) {
            let link = `https://twitter.com/share?url=${url}&text=${title}`
            return link;
        }
    },    
]
