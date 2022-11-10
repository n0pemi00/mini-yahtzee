import { StyleSheet } from 'react-native';

export default StyleSheet.create({

  header: {
    marginTop: 30,
    marginBottom: 15,
    backgroundColor: "#ED4E2C",
    flexDirection: 'row',
  },
  footer: {
    marginTop: 20,
    backgroundColor: "#ED4E2C",
    flexDirection: 'row'
  },
  title: {
    color: 'black',
    flex: 1,
    fontSize: 23,
    textAlign: 'center',
    margin: 10,
  },
  author: {
    color: 'black',
    fontWeight: 'bold',
    flex: 1,
    fontSize: 15,
    textAlign: 'center',
    margin: 10,
  },
  gameboard: {
    backgroundColor: "fff",
    alignItems: 'center',
    justifyContent: 'center'
  },
  gameinfo: {
    backgroundColor: "#ED4E2C",
    textAlign: 'center',
    justifyContent: 'center',
    marginTop: 10,
    padding: 5,
    borderRadius: 10,
    overflow: 'hidden',
    fontSize: 13
  },
  row: {
    marginTop: 20,
    padding: 10
  },
  flex: {
    flexDirection: "row",
    padding: 3
  },
  button: {
    margin: 30,
    flexDirection: "row",
    padding: 5,
    backgroundColor: "#ED4E2C",
    width: 150,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText: {
    color:"black",
    fontSize: 18,
    padding: 5
  }
});