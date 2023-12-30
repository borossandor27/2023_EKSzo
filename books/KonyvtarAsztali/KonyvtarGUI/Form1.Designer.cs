
namespace KonyvtarGUI
{
    partial class Form1
    {
        /// <summary>
        /// Required designer variable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        /// Clean up any resources being used.
        /// </summary>
        /// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Windows Form Designer generated code

        /// <summary>
        /// Required method for Designer support - do not modify
        /// the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            this.listBox_Konyvek = new System.Windows.Forms.ListBox();
            this.button_delete = new System.Windows.Forms.Button();
            this.SuspendLayout();
            // 
            // listBox_Konyvek
            // 
            this.listBox_Konyvek.Dock = System.Windows.Forms.DockStyle.Left;
            this.listBox_Konyvek.FormattingEnabled = true;
            this.listBox_Konyvek.Location = new System.Drawing.Point(0, 0);
            this.listBox_Konyvek.Name = "listBox_Konyvek";
            this.listBox_Konyvek.Size = new System.Drawing.Size(467, 450);
            this.listBox_Konyvek.TabIndex = 0;
            // 
            // button_delete
            // 
            this.button_delete.Location = new System.Drawing.Point(580, 61);
            this.button_delete.Name = "button_delete";
            this.button_delete.Size = new System.Drawing.Size(169, 56);
            this.button_delete.TabIndex = 1;
            this.button_delete.Text = "Törlés";
            this.button_delete.UseVisualStyleBackColor = true;
            this.button_delete.Click += new System.EventHandler(this.button_delete_Click);
            // 
            // Form1
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 13F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(800, 450);
            this.Controls.Add(this.button_delete);
            this.Controls.Add(this.listBox_Konyvek);
            this.Name = "Form1";
            this.Text = "Form1";
            this.Load += new System.EventHandler(this.Form1_Load);
            this.ResumeLayout(false);

        }

        #endregion

        private System.Windows.Forms.ListBox listBox_Konyvek;
        private System.Windows.Forms.Button button_delete;
    }
}

