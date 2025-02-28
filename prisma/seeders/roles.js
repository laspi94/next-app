const event = new Date();

event.setHours(event.getHours() - 4);

const formattedEvent = event.toISOString();

const roles = [
    {
        id: 1,
        name: 'SysAdmin',
        created_at: formattedEvent
    }
];

module.exports = {
    roles
};
