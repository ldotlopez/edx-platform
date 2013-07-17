
EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'

DEFAULT_FROM_EMAIL = 'registration@mooc.uji.es'
DEFAULT_FEEDBACK_EMAIL = 'feedback@mooc.uji.es'
SERVER_EMAIL = 'devops@mooc.uji.es'
TECH_SUPPORT_EMAIL = 'technical@mooc.uji.es'
CONTACT_EMAIL = 'info@mooc.uji.es'
BUGS_EMAIL = 'bugs@mooc.uji.es'
ADMINS = (
    ('edX Admins', 'lopezl@sg.uji.es'),
)

# Locale/Internationalization
TIME_ZONE = 'Europe/Madrid'  # http://en.wikipedia.org/wiki/List_of_tz_zones_by_name
FORCE_SCRIPT_NAME = ''


#UJI: from lms/envs/common.py modifications
SITE_NAME = "mooc.uji.es"
HTTPS = 'no'
 

COMMENTS_SERVICE_KEY = "pepito"
COMMENTS_SERVICE_URL = "http://localhost:8082/"


DEBUG = True
TEMPLATE_DEBUG = True
