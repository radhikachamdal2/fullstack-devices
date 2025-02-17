// src/screens/HomeScreen.tsx
import React from "react";
import {
  View,
  Text,
  FlatList,
  Button,
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useQuery } from "@apollo/client";
import { GET_ACCOUNTS_QUERY } from "../app/src/queries/queries";
import { Table, Row, Rows } from "react-native-table-component";

const HomeScreen = ({ navigation }: any) => {
  const { data, loading, error } = useQuery(GET_ACCOUNTS_QUERY);

  console.log(data, "data");

  if (loading)
    return (
      <ActivityIndicator size="large" color="#007bff" style={styles.loader} />
    );
  if (error)
    return (
      <Text style={styles.errorText}>
        Error loading accounts: {error.message}
      </Text>
    );

  const tableHead = ["Account Name", "Email", "Devices"]; // Table Headers
  const tableData = data.accounts.map((account: any) => {
    const deviceNames =
      account?.devices?.map((device: any) => device.name).join(", ") ||
      "No Devices";
    return [account.name, account.email, deviceNames];
  });

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity
        style={styles.createButton}
        onPress={() => navigation.navigate("CreateAccount")}
      >
        <Text style={styles.createButtonText}>Create New Account</Text>
      </TouchableOpacity>

      {/* Table Display */}
      <Table borderStyle={styles.tableBorder}>
        <Row
          data={tableHead}
          style={styles.tableHeader}
          textStyle={styles.tableText}
        />
        <Rows
          data={tableData}
          style={styles.tableRow}
          textStyle={styles.tableText}
        />
      </Table>

      {/* Account details */}
      <FlatList
        data={data.accounts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.accountCard}>
            <Text style={styles.accountTitle}>
              {item.name} ({item.email})
            </Text>
            <Text style={styles.deviceTitle}>Devices:</Text>
            {/* {item?.devices.length > 0 ? (
              item?.devices.map((device) => (
                <Text key={device.id} style={styles.deviceText}>
                  {" "}
                  - {device.name}
                </Text>
              ))
            ) : (
              <Text style={styles.deviceText}>
                No devices associated with this account.
              </Text>
            )} */}
            <TouchableOpacity
              style={styles.addButton}
              onPress={() =>
                navigation.navigate("CreateDevice", { accountId: item.id })
              }
            >
              <Text style={styles.addButtonText}>Add Device</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
    padding: 15,
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 50,
  },
  errorText: {
    color: "red",
    textAlign: "center",
    fontSize: 18,
    marginTop: 20,
  },
  createButton: {
    backgroundColor: "#007bff",
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
    alignItems: "center",
  },
  createButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  tableBorder: {
    borderWidth: 1,
    borderColor: "#c8e1ff",
    marginBottom: 20,
  },
  tableHeader: {
    height: 40,
    backgroundColor: "#f1f8ff",
    justifyContent: "center",
  },
  tableRow: {
    height: 40,
    backgroundColor: "#fff",
    justifyContent: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#e4e4e4",
  },
  tableText: {
    textAlign: "center",
    fontSize: 14,
    fontWeight: "500",
  },
  accountCard: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  accountTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  deviceTitle: {
    fontSize: 16,
    marginTop: 10,
    color: "#555",
  },
  deviceText: {
    fontSize: 14,
    color: "#555",
    marginLeft: 10,
  },
  addButton: {
    backgroundColor: "#28a745",
    padding: 10,
    borderRadius: 8,
    marginTop: 15,
    alignItems: "center",
  },
  addButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default HomeScreen;
