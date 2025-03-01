/*
 * Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
 * SPDX-License-Identifier: MIT-0
 */

const SERVER_URL = 'https://service.chime.aws.amazon.com';
const SERVER_REGION = 'us-east-1'

export function createMeetingRequest(meetingName, attendeeName) {

  let url = encodeURI(SERVER_URL + "/join?" + `title=${meetingName}&name=${attendeeName}&region=${SERVER_REGION}`);
  return fetch(url, { method: 'POST' }).then(j => j.json()).catch(err => console.log(err, "err"));
}
