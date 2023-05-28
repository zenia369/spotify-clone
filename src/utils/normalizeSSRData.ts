export default <T>(data: T): T => JSON.parse(JSON.stringify(data))
