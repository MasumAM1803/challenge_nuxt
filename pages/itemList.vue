<template>
  <v-main>
    <v-card>
      <v-card-title>
        <v-row>
          <v-col>
            <v-toolbar
            flat
            >
            <v-toolbar-title>Tabel Barang</v-toolbar-title>
              <v-divider
                class="mx-4"
                inset
                vertical
              ></v-divider>
              <v-spacer></v-spacer>
              <!-- Create and Edit Dialog -->
              <v-dialog
                v-model="dialog"
                max-width="800px"
              >
                <template v-if="!guest" v-slot:activator="{ on,attrs }">
                  <v-btn
                    color="primary"
                    dark
                    class="mb-2"
                    v-bind="attrs"
                    v-on="on"
                  >Tambah Barang
                  </v-btn>
                </template>
                <template>
                  <v-card>
                    <v-card-title>
                      <span class="text-h5">{{ formTitle }}</span>
                    </v-card-title>
                    <v-card-text>
                      <v-container>
                        <v-row>
                          <v-col
                            cols="12"
                            sm="6"
                            md="4"
                          >
                            <v-text-field
                              v-model="editedItem.name"
                              label="Nama Barang"
                            ></v-text-field>
                          </v-col>
                          <v-col
                            cols="12"
                            sm="6"
                            md="4"
                          >
                            <v-select
                              v-model="editedItem.color"
                              flat
                              solo-inverted
                              :items="keys"
                              prepend-inner-icon="mdi-magnity"
                              label="Warna"
                            ></v-select>
                          </v-col>
                        </v-row>
                      </v-container>
                    </v-card-text>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn
                        color="blue darken-1"
                        text
                        @click="close"
                      >Cancel</v-btn>
                      <v-btn
                        color="blue darken-1"
                        text
                        @click="save"
                      >Save</v-btn>
                    </v-card-actions>
                  </v-card>
                </template>
              </v-dialog>
              <!-- Delete Dialog -->
              <v-dialog v-model="dialogDelete" max-width="500px">
                <v-card>
                  <v-card-title class="text-h5">Apakah anda yakin akan menghapus data ini?</v-card-title>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="closeDelete">Close</v-btn>
                    <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
                    <v-spacer></v-spacer>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-toolbar>
          </v-col>
        </v-row>
      </v-card-title>
      <v-card-title>
        <v-row>
          <v-col>
            <v-text-field
              v-model="search"
              append-icon="mdi-magnity"
              label="Search"
              single-line
              hide-details
            ></v-text-field>
          </v-col>
          <v-col>
            <v-select
              v-model="filterBy"
              flat
              solo-inverted
              :items="keys"
              prepend-inner-icon="mdi-magnity"
              label="Filter Berdasarkan Warna"
            ></v-select>
          </v-col>
        </v-row>
      </v-card-title>
      <v-data-table
        :headers="headers"
        :items="filteredKeys"
        :search="search"
      >
        <template v-slot:item.actions="{ item }">
          <v-icon
            small
            class="mr-2"
            @click="editItem(item)"
          >mdi-pencil</v-icon>
          <v-icon
            small
            @click="deleteItem(item)"
          >mdi-delete</v-icon>
        </template>
      </v-data-table>
    </v-card>
  </v-main>
</template>

<script>
export default {
  data() {
    return {
      guest: false,
      search: "",
      filterBy: null,
      keys: ["Semua Warna", "Biru", "Hijau", "Hitam", "Kuning", "Merah", "Putih"],
      headers: [
        {
          text: "Nama Barang",
          value: "name",
        },
        {
          text: "Warna",
          value: "color",
        },
        {
          text: 'Aksi',
          value: 'actions',
          sortable: false
        },
      ],
      goods: [
        {
          name: "Baju",
          color: "Merah",
        },
        {
          name: "Sepatu",
          color: "Kuning",
        },
        {
          name: "Celana",
          color: "Biru",
        },
      ],
      dialog: false,
      dialogDelete: false,
      editedIndex: -1,
      editedItem: {
        name: '',
        color: '',
      },
      defaultItem: {
        name: '',
        color: '',
      }
    };
  },

  computed: {
    filteredKeys() {
      return this.goods.filter((i) => {
        if (this.filterBy === "Semua Warna") {
          console.log(this.goods);
          return this.goods;
        } else {
          return !this.filterBy || i.color === this.filterBy;
        }
      });
    },

    formTitle() {
      return this.editedIndex === -1 ? 'Tambah Barang' : 'Ubah'
    }
  },

  methods: {
    searchByName(value, search, item) {
      return (
        value != null &&
        search != null &&
        typeof value === "string" &&
        value.toString().indexOf(search) !== -1
      );
    },

    close() {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.goods[this.editedIndex], this.editedItem)
      } else {
        this.goods.push(this.editedItem)
      }
      this.close()
    },

    editItem(item) {
      this.editedIndex = this.goods.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem(item) {
      this.editedIndex = this.goods.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },

    closeDelete() {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    deleteItemConfirm() {
      this.goods.splice(this.editedIndex, 1)
      this.closeDelete()
    }
  },
};
</script>
