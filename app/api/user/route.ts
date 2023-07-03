import { NextResponse } from 'next/server';

const dummy_user = {
    "country": "string",
    "display_name": "string",
    "email": "string",
    "explicit_content": {
      "filter_enabled": false,
      "filter_locked": false
    },
    "external_urls": {
      "spotify": "string"
    },
    "followers": {
      "href": "string",
      "total": 0
    },
    "href": "string",
    "id": "string",
    "images": [
      {
        "url": "https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228",
        "height": 300,
        "width": 300
      }
    ],
    "product": "string",
    "type": "string",
    "uri": "string"
}

export async function GET() {
    // TODO: this needs to be fetched using auth token
    return NextResponse.json(dummy_user);
}