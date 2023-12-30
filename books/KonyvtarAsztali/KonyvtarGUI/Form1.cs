using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using KonyvtarAsztali;
using MySql.Data.MySqlClient;

namespace KonyvtarGUI
{
    
    public partial class Form1 : Form
    {
        MySqlConnection connection = null;
        MySqlCommand command = null;
        public Form1()
        {
            InitializeComponent();
        }

        private void Form1_Load(object sender, EventArgs e)
        {
            Console.WriteLine("Adatok beolvasása...");
            MySqlConnectionStringBuilder sb = new MySqlConnectionStringBuilder();
            sb.Server = "localhost";
            sb.UserID = "root";
            sb.Password = "";
            sb.Database = "vizsga_books";
            sb.CharacterSet = "UTF8";
            connection = new MySqlConnection(sb.ConnectionString);
            adatokBeolvasasa();
        }
        private void adatokBeolvasasa()
        {
            listBox_Konyvek.Items.Clear();
            try
            {
                if (connection.State!=ConnectionState.Open)
                {
                    connection.Open();
                }
                command = connection.CreateCommand();
                //-- Könyvek adatainak a beolvasása -------
                command.CommandText = "SELECT `id`,`title`,`author`,`publish_year`,`page_count` FROM `books` WHERE 1 ORDER BY `author`";
                using (MySqlDataReader dr = command.ExecuteReader())
                {
                    while (dr.Read())
                    {
                        Konyv uj = new Konyv(dr.GetInt32("id"), dr.GetString("title"), dr.GetString("author"), dr.GetInt32("publish_year"), dr.GetInt32("page_count"));
                        listBox_Konyvek.Items.Add(uj);
                    }
                }
            }
            catch (MySqlException ex)
            {

                Console.WriteLine(ex.Message);
                Environment.Exit(0);
            }
            connection.Close();
        }

        private void button_delete_Click(object sender, EventArgs e)
        {
            if (listBox_Konyvek.SelectedIndex<0)
            {
                MessageBox.Show("Nincs kiválasztott elem");
                return;
            }
            Konyv konyv = (Konyv)listBox_Konyvek.SelectedItem;
            if (MessageBox.Show("Valóban törölni szeretné?","Megerősítést kérek",MessageBoxButtons.YesNo,MessageBoxIcon.Warning)!=DialogResult.Yes)
            {
                return;
            }
            try
            {
                if (connection.State != ConnectionState.Open)
                {
                    connection.Open();
                }

                command.CommandText = "DELETE FROM `books` WHERE `id`=" + konyv.Id;
                command.ExecuteNonQuery();
                adatokBeolvasasa();
            }
            catch (MySqlException ex)
            {
                MessageBox.Show(ex.Message);
            }

        }
    }

}

