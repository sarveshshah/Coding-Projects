<?php
class Playlist {

		private $con;
		private $id;
                private $name;
                private $owner;

		public function __construct($con, $data) {
			$this->con = $con;
			$this->id=$data['id'];
                        $this->owner=$data['owner'];
                        $this->name=$data['name'];
                }
                
                public function getName(){
                    return $this->name;
                }
                
                public function getId(){
                    return $this->id;
                }
                public function getOwner(){
                    return $this->owner;
                }
                
                public function getNumberOfSongs(){
                    $query= mysqli_query($this->con,"SELECT songId FROM playlistSongs WHERE playlistId=$this->id")
                }

                
            }
?>
