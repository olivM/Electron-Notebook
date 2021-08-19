const { Notification } = require('electron');

// display files added notification
const filesAdded = (size) => {
    const notif = new Notification({
        title: 'Files added',
        body: `${size} file(s) has been successfully added.`,
    });

    notif.show();
};
export default {
    filesAdded,
};
