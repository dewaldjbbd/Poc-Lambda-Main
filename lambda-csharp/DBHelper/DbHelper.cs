using Npgsql;
using System.Data;

namespace DBHelper
{
    public class DbHelper
    {
        public static string? ErrorMsg { get; set; }

        /// <summary>
        /// Returns connection string
        /// </summary>
        private static string GetConnectionString()
        {
            string dbname = "postgres";
            string username = "postgres";
            string password = "postgres";
            string hostname = "altx-poc.c4626gxk5k9x.eu-north-1.rds.amazonaws.com";
            string port = "5432";

            return "Server=" + hostname + ";Port=" + port + "; Database=" + dbname + ";User Id=" + username + "; Password=" + password + "; ";
        }

        /// <summary>
        /// Returns Data Table
        /// </summary>
        /// <param name="mySQL">Query string</param>
        /// <returns></returns>
        public static DataTable? GetDataTable(string mySQL)
        {
            DataTable dt = new();
            try
            {
                using (NpgsqlConnection connection = new())
                {
                    connection.ConnectionString = GetConnectionString();
                    connection.Open();
                    NpgsqlCommand cmd = new()
                    {
                        Connection = connection,
                        CommandText = mySQL,
                        CommandType = CommandType.Text
                    };
                    NpgsqlDataAdapter da = new(cmd);
                    da.Fill(dt);
                    cmd.Dispose();
                }
                return dt;
            }
            catch (Exception ex)
            {
                ErrorMsg = ex.Message;
            }

            return null;
        }

        public static bool ExecuteReader(string mySQL)
        {
            try
            {
                using var conn = new NpgsqlConnection(GetConnectionString());

                Console.Out.WriteLine("Opening connection");
                conn.Open();

                using var command = new NpgsqlCommand(mySQL, conn);

                command.ExecuteReader();
            }
            catch (Exception ex)
            {
                ErrorMsg = ex.Message;
                return false;
            }

            return true;

        }
    }
}